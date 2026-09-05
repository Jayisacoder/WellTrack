const wellnessKnowledgeBase = [
  {
    id: 'sleep',
    topics: ['sleep', 'insomnia', 'tired'],
    guidance:
      'Consistent sleep and wake times, a cool dark room, and reducing screens before bed can support better sleep. Persistent sleep problems should be discussed with a qualified healthcare professional.',
  },
  {
    id: 'stress',
    topics: ['stress', 'anxious', 'anxiety', 'overwhelm'],
    guidance:
      'Short breathing exercises, brief movement breaks, and identifying one manageable next step can help reduce immediate stress. Severe or persistent anxiety should be discussed with a qualified healthcare professional.',
  },
  {
    id: 'exercise',
    topics: ['exercise', 'workout', 'active', 'movement'],
    guidance:
      'Small, consistent amounts of movement are a reasonable starting point. Choose an activity that feels safe and sustainable rather than focusing only on intensity.',
  },
  {
    id: 'mood',
    topics: ['mood', 'sad', 'depressed', 'happy'],
    guidance:
      'Mood patterns can be influenced by sleep, activity, stress, and social connection. Tracking trends can support reflection but does not diagnose or treat a mental-health condition.',
  },
]

function scoreEntry(entry, text) {
  return entry.topics.reduce(
    (score, topic) => score + (text.includes(topic) ? 1 : 0),
    0
  )
}

export function retrieveWellnessGuidance({ entry, stats }) {
  const searchableText = [
    `mood ${entry.mood}`,
    `stress ${entry.stress}`,
    `sleep ${entry.sleep}`,
    entry.exercise ? 'exercise active movement' : '',
    `average mood ${stats.avgMood}`,
    `average stress ${stats.avgStress}`,
  ]
    .join(' ')
    .toLowerCase()

  const matches = wellnessKnowledgeBase
    .map((item) => ({ item, score: scoreEntry(item, searchableText) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)

  return matches.length > 0
    ? matches.map(({ item }) => `[${item.id}] ${item.guidance}`).join('\n')
    : 'No specific guidance was retrieved from the private wellness knowledge base.'
}
