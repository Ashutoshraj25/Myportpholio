const LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql'

const PROFILE_QUERY = `
  query portfolioLeetCodeProfile($username: String!, $limit: Int!) {
    matchedUser(username: $username) {
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      userCalendar {
        submissionCalendar
      }
    }
    recentAcSubmissionList(username: $username, limit: $limit) {
      title
      titleSlug
      timestamp
    }
  }
`

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

async function fetchLeetCodeGraphql(query, variables = {}) {
  const payload = await fetchJson(LEETCODE_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://leetcode.com',
      Referer: 'https://leetcode.com',
      'User-Agent': 'Mozilla/5.0',
    },
    body: JSON.stringify({ query, variables }),
  })

  if (payload?.errors?.length) {
    throw new Error(payload.errors[0]?.message || 'LeetCode GraphQL request failed')
  }

  return payload.data
}

function extractSolvedCount(list, difficulty) {
  const match = list.find((item) => item?.difficulty === difficulty)
  const count = Number(match?.count)
  return Number.isFinite(count) ? count : 0
}

function normalizeStats(profileData) {
  const acceptedCounts = profileData?.matchedUser?.submitStatsGlobal?.acSubmissionNum ?? []
  const submissionCalendar = profileData?.matchedUser?.userCalendar?.submissionCalendar
  const parsedCalendar =
    typeof submissionCalendar === 'string' ? JSON.parse(submissionCalendar || '{}') : submissionCalendar ?? null

  return {
    totalSolved: extractSolvedCount(acceptedCounts, 'All'),
    easySolved: extractSolvedCount(acceptedCounts, 'Easy'),
    mediumSolved: extractSolvedCount(acceptedCounts, 'Medium'),
    hardSolved: extractSolvedCount(acceptedCounts, 'Hard'),
    submissionCalendar: parsedCalendar && typeof parsedCalendar === 'object' ? parsedCalendar : null,
    recentSubmissions: (profileData?.recentAcSubmissionList ?? []).slice(0, 3).map((submission) => ({
      ...submission,
      lang: 'Accepted',
      statusDisplay: 'Accepted',
    })),
  }
}

export default async function handler(req, res) {
  const username = req.query?.username || 'rajashutosh324a'

  try {
    const [statsPayload, dailyPayload] = await Promise.allSettled([
      fetchLeetCodeGraphql(PROFILE_QUERY, { username, limit: 3 }),
      fetchLeetCodeGraphql(DAILY_QUESTION_QUERY),
    ])

    const stats = statsPayload.status === 'fulfilled' ? normalizeStats(statsPayload.value) : null
    const dailyQuestion =
      dailyPayload.status === 'fulfilled'
        ? dailyPayload.value?.activeDailyCodingChallengeQuestion ?? null
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
