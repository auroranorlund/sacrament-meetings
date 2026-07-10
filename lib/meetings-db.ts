import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-06-14',
    meetingType: 'regular',
    presiding: 'Bishop Doe',
    conducting: 'Brother Jameson',
    openingHymn: { number: 1001, title: 'Come, Thou Fount of Every Blessing' },
    openingPrayer: 'Brother Erikson',
    wardBusiness: [{ description: 'Welcoming Jane Doe as a newly baptized member' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
    speakers: [
      { name: 'Brother Wolf', topic: 'Strengthening Faith in Christ', type: 'speaker' },
      { name: 'Sister Wolf', topic: 'Strengthening Faith in Christ', type: 'speaker' }
    ],
    closingHymn: { number: 86, title: 'How Great Thou Art' },
    closingPrayer: 'Sister Johnson',
    announcements: ['Fourth of July Breakfast next Saturday', 'Ward Service Project on Wednesday, July 1st']
    },
    {
    id: 2,
    date: '2026-06-21',
    meetingType: 'regular',
    presiding: 'Bishop Doe',
    conducting: 'Brother Jameson',
    openingHymn: { number: 3, title: 'Now Let Us Rejoice' },
    openingPrayer: 'Sister Smith',
    wardBusiness: [{ description: "Releasing of Young Women's counselor" }],
    stakeBusiness: true,
    sacramentHymn: { number: 173, title: "While of These Emblems We Partake" },
    speakers: [
      { name: 'Brother Jones', topic: 'Centering families on Christ', type: 'speaker' },
      { name: 'Sister Jones', topic: 'Centering families on Christ', type: 'speaker' }
    ],
    closingHymn: { number: 86, title: 'How Great Thou Art' },
    closingPrayer: 'Sister Anderson',
    announcements: ['Fourth of July Breakfast', 'Ward Service Project on Wednesday, July 1st']
    },
    {
    id: 3,
    date: '2026-06-28',
    meetingType: 'regular',
    presiding: 'Bishop Doe',
    conducting: 'Brother Jameson',
    openingHymn: { number: 47, title: 'We Will Sing of Zion' },
    openingPrayer: 'Sister Kidd',
    wardBusiness: [{ description: 'Sustaining of new ward clerk' }],
    stakeBusiness: false,
    sacramentHymn: { number: 191, title: "Behold the Great Redeemer Die" },
    speakers: [
      { name: 'Sister Jefferson', topic: 'The Atonement', type: 'speaker' },
      { name: 'Brother Jefferson', topic: 'The Atonement', type: 'speaker' }
    ],
    closingHymn: { number: 5, title: 'High on the Mountain Top' },
    closingPrayer: 'Brother Kidd',
    announcements: ['Fourth of July Breakfast', 'Ward Service Project on Wednesday, July 1st']
    },
      {
    id: 4,
    date: '2026-06-29',
    meetingType: 'regular',
    presiding: 'Bishop Doe',
    conducting: 'Brother Jameson',
    openingHymn: { number: 89, title: 'The Lord is My Light' },
    openingPrayer: 'Brother Brown',
    wardBusiness: [{ description: 'Sustaining of new ward clerk' }],
    stakeBusiness: false,
    sacramentHymn: { number: 191, title: "Behold the Great Redeemer Die" },
    speakers: [
      { name: 'Brother Wilson', topic: 'Temple Worship', type: 'speaker' },
      { name: 'Sister Wilson', topic: 'Temple Worship', type: 'speaker' }
    ],
    closingHymn: { number: 86, title: 'How Great Thou Art' },
    closingPrayer: 'Sister Johnson',
    announcements: ['Fourth of July Breakfast next Saturday', 'Ward Service Project on Wednesday, July 1st']
    },
    {
    id: 5,
    date: '2026-07-05',
    meetingType: 'testimony',
    presiding: 'Bishop Doe',
    conducting: 'Brother Reid',
    openingHymn: { number: 339, title: 'My Country, Tis of Thee' },
    openingPrayer: 'Sister Smith',
    wardBusiness: [{ description: 'none' }],
    stakeBusiness: true,
    sacramentHymn: { number: 175, title: "O God, The Eternal Father" },
    speakers: [
      { name: 'Brother Reid', topic: 'opening testimony', type: 'speaker' },
    ],
    closingHymn: { number: 1, title: 'The Morning Breaks' },
    closingPrayer: 'Sister Johnson'
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}