const DAILY_QUESTION_QUERY = `
  query dailyQuestion {
    activeDailyCodingChallengeQuestion {
      date
      link
      question {
        difficulty
        questionFrontendId
        title
        titleSlug
      }
    }
  }
`

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  return response.json()
}

export default async function handler(req, res) {
  const username = req.query?.username || 'rajashutosh324a'
  const statsUrl = `https://alfa-leetcode-api.onrender.com/userProfile/${username}`

  try {
    const [statsPayload, dailyPayload] = await Promise.allSettled([
      fetchJson(statsUrl),
      fetchJson('https://leetcode.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: DAILY_QUESTION_QUERY }),
      }),
    ])

    const stats = statsPayload.status === 'fulfilled' ? statsPayload.value : null
    const dailyQuestion =
      dailyPayload.status === 'fulfilled'
        ? dailyPayload.value?.data?.activeDailyCodingChallengeQuestion ?? null
        : null

    if (!stats && !dailyQuestion) {
      throw new Error('Unable to fetch LeetCode data')
    }

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600')
    res.status(200).json({
      stats,
      dailyQuestion,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Unable to fetch LeetCode data',
      error: error.message,
    })
  }
}
