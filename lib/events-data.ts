export type EventItem = {
  id: string
  title: string
  date: string // ISO
  type: string
  description: string
  image?: string | null
}

export const EVENTS: EventItem[] = [
  // Smart Start - January for freshers
  {
    id: "ev-smart-start",
    title: "Smart Start",
    date: new Date(new Date().getFullYear(), 0, 15).toISOString(),
    type: "Academic",
    description:
      "A kickstart program for university first-year students (freshers) to help them begin their academic journey with excellence. This event provides orientation, mentorship, and community building opportunities.",
    image: null,
  },

  // Prayer Buffet - throughout the year
  {
    id: "ev-prayer-buffet-1",
    title: "Prayer Buffet",
    date: new Date(new Date().getFullYear(), 1, 20).toISOString(),
    type: "Spiritual",
    description:
      "A spiritually enriching gathering where we come together in prayer, worship, and intercession. Join us as we lift our hearts and minds to God through collective prayer and fellowship.",
    image: null,
  },

  // Prayer Walk - throughout the year
  {
    id: "ev-prayer-walk-1",
    title: "Prayer Walk",
    date: new Date(new Date().getFullYear(), 2, 15).toISOString(),
    type: "Community",
    description:
      "Take a journey through our community while engaging in prayer and intercession. This walking event combines physical activity with spiritual focus as we pray for our neighborhood and ministries.",
    image: null,
  },

  // Games and Food Bazaar - throughout the year
  {
    id: "ev-games-bazaar-1",
    title: "Games and Food Bazaar",
    date: new Date(new Date().getFullYear(), 3, 10).toISOString(),
    type: "Community",
    description:
      "A fun-filled community event featuring games, food vendors, entertainment, and fellowship. Bring your family and friends for a day of laughter, great food, and meaningful connections.",
    image: null,
  },

  // School of the Word - throughout the year
  {
    id: "ev-school-of-word-1",
    title: "School of the Word",
    date: new Date(new Date().getFullYear(), 4, 5).toISOString(),
    type: "Educational",
    description:
      "An in-depth biblical teaching and learning session designed to deepen your understanding of Scripture. Grow spiritually as we explore God's word together through focused study and discussion.",
    image: null,
  },

  // Special Jesus event - throughout the year
  {
    id: "ev-special-jesus-1",
    title: "Special Jesus",
    date: new Date(new Date().getFullYear(), 5, 1).toISOString(),
    type: "Worship",
    description:
      "A special celebration focused on exalting the name of Jesus Christ. Experience powerful worship, testimonies, and ministry as we gather to honor and celebrate our Savior.",
    image: null,
  },

  // Camp Meeting - end of semester (June)
  {
    id: "ev-camp-meeting-1",
    title: "Camp Meeting",
    date: new Date(new Date().getFullYear(), 5, 20).toISOString(),
    type: "Retreat",
    description:
      "A transformative multi-day retreat held at the end of each semester. This camp brings our community together for intensive worship, prayer, teaching, and fellowship in a retreat setting.",
    image: null,
  },

  // Outreach - throughout the year
  {
    id: "ev-outreach-1",
    title: "Outreach",
    date: new Date(new Date().getFullYear(), 7, 10).toISOString(),
    type: "Service",
    description:
      "Our compassionate ministry to the community. Join us as we serve others, share the Gospel, and demonstrate the love of Christ through practical help and spiritual support.",
    image: null,
  },

  // Additional events throughout the year
  {
    id: "ev-prayer-buffet-2",
    title: "Prayer Buffet",
    date: new Date(new Date().getFullYear(), 8, 15).toISOString(),
    type: "Spiritual",
    description:
      "A spiritually enriching gathering where we come together in prayer, worship, and intercession. Join us as we lift our hearts and minds to God through collective prayer and fellowship.",
    image: null,
  },

  {
    id: "ev-prayer-walk-2",
    title: "Prayer Walk",
    date: new Date(new Date().getFullYear(), 9, 20).toISOString(),
    type: "Community",
    description:
      "Take a journey through our community while engaging in prayer and intercession. This walking event combines physical activity with spiritual focus as we pray for our neighborhood and ministries.",
    image: null,
  },

  {
    id: "ev-school-of-word-2",
    title: "School of the Word",
    date: new Date(new Date().getFullYear(), 9, 30).toISOString(),
    type: "Educational",
    description:
      "An in-depth biblical teaching and learning session designed to deepen your understanding of Scripture. Grow spiritually as we explore God's word together through focused study and discussion.",
    image: null,
  },

  {
    id: "ev-games-bazaar-2",
    title: "Games and Food Bazaar",
    date: new Date(new Date().getFullYear(), 10, 5).toISOString(),
    type: "Community",
    description:
      "A fun-filled community event featuring games, food vendors, entertainment, and fellowship. Bring your family and friends for a day of laughter, great food, and meaningful connections.",
    image: null,
  },

  // Camp Meeting - end of semester (November/December)
  {
    id: "ev-camp-meeting-2",
    title: "Camp Meeting",
    date: new Date(new Date().getFullYear(), 10, 25).toISOString(),
    type: "Retreat",
    description:
      "A transformative multi-day retreat held at the end of each semester. This camp brings our community together for intensive worship, prayer, teaching, and fellowship in a retreat setting.",
    image: null,
  },

  {
    id: "ev-outreach-2",
    title: "Outreach",
    date: new Date(new Date().getFullYear(), 11, 10).toISOString(),
    type: "Service",
    description:
      "Our compassionate ministry to the community. Join us as we serve others, share the Gospel, and demonstrate the love of Christ through practical help and spiritual support.",
    image: null,
  },
]
