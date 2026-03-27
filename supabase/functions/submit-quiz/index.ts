import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-employee-id, x-employee-pin',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const employeeId = req.headers.get('x-employee-id')
    const employeePin = req.headers.get('x-employee-pin')

    if (!employeeId || !employeePin) {
      return new Response(JSON.stringify({ error: '認証情報が不足しています' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // 1. PIN認証
    const { data: pinOk, error: pinError } = await supabaseAdmin.rpc('verify_employee_pin', {
      p_employee_id: employeeId,
      p_pin: employeePin,
    })

    if (pinError || !pinOk) {
      return new Response(JSON.stringify({ error: 'PIN認証に失敗しました' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const body = await req.json()
    const { course_id, answers } = body as {
      course_id: string
      answers: { question_id: string; choice_id: string }[]
    }

    if (!course_id || !answers?.length) {
      return new Response(JSON.stringify({ error: 'リクエスト形式が不正です' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // 2. 採点（choices テーブルから is_correct を取得）
    const { data: choicesData, error: choicesError } = await supabaseAdmin
      .from('choices')
      .select('id, question_id, is_correct')
      .in('id', answers.map((a) => a.choice_id))

    if (choicesError) throw choicesError

    const choicesMap = new Map(
      (choicesData ?? []).map((c: { id: string; question_id: string; is_correct: boolean }) => [c.id, c])
    )

    // 3. コースの合格点を取得
    const { data: courseData, error: courseError } = await supabaseAdmin
      .from('courses')
      .select('pass_score')
      .eq('id', course_id)
      .single()

    if (courseError) throw courseError

    const details = answers.map((a) => {
      const choice = choicesMap.get(a.choice_id)
      return {
        question_id: a.question_id,
        choice_id: a.choice_id,
        is_correct: choice?.is_correct ?? false,
      }
    })

    const correct = details.filter((d) => d.is_correct).length
    const total = answers.length
    const score = total > 0 ? Math.round((correct / total) * 100) : 0
    const passed = score >= (courseData?.pass_score ?? 70)

    // 4. progress を upsert
    const { error: progressError } = await supabaseAdmin
      .from('progress')
      .upsert({
        employee_id: employeeId,
        course_id,
        status: passed ? '合格' : '不合格',
        score,
        attempted_at: new Date().toISOString(),
      }, { onConflict: 'employee_id,course_id' })

    if (progressError) throw progressError

    // 5. answer_logs に insert
    const logRows = details.map((d) => ({
      employee_id: employeeId,
      course_id,
      question_id: d.question_id,
      choice_id: d.choice_id,
      is_correct: d.is_correct,
    }))

    const { error: logError } = await supabaseAdmin.from('answer_logs').insert(logRows)
    if (logError) throw logError

    return new Response(
      JSON.stringify({
        score,
        passed,
        total,
        correct,
        details: details.map((d) => ({ question_id: d.question_id, is_correct: d.is_correct })),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (e) {
    const message = e instanceof Error ? e.message : '内部エラーが発生しました'
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
