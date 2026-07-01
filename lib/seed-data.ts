import type { Playlist, Track } from "@/lib/types";

export const LOGO_URL =
  "https://res.cloudinary.com/dakjhsfne/image/upload/v1782850968/Sin_t%C3%ADtulo_-_30_de_junio_de_2026_a_las_13.57.18_sygc6j.png";

export const LYRICS_PLACEHOLDER =
  "[00:00.00] Letras privadas no agregadas todavia\n[00:08.00] Pega tu LRC desde Admin\n[00:16.00] NOCTRA escucha privada";

export const seedTracks: Track[] = [
  {
    id: "00000000-0000-4000-8000-000000000004",
    title: "Careless Whisper",
    artist: "George Michael",
    album: "Single",
    genre: "Pop / Sax / Classic",
    mood: "Night Drive",
    audio_url:
      "https://res.cloudinary.com/dakjhsfne/video/upload/v1782825188/George_Michael_-_Careless_Whisper_Lyrics_hjgxfz.mp3",
    cover_url: "https://res.cloudinary.com/dakjhsfne/image/upload/v1782826925/carelesswhisper_meyvzv.jpg",
    lyrics_lrc: LYRICS_PLACEHOLDER,
    duration: 300,
    is_favorite: true,
    play_count: 0
  },
  {
    id: "00000000-0000-4000-8000-000000000001",
    title: "Redemption",
    artist: "Kidwild ft. Nemzzz",
    album: "Single",
    genre: "UK Rap / Hip-Hop",
    mood: "After Hours",
    audio_url:
      "https://res.cloudinary.com/dakjhsfne/video/upload/v1782850968/Kidwild_-_Redemption_Ft._Nemzzz_Music_Video_dhmt7o.mp3",
    cover_url: "https://res.cloudinary.com/dakjhsfne/image/upload/v1782850968/redemption_fyut2z.jpg",
    lyrics_lrc: LYRICS_PLACEHOLDER,
    duration: 184,
    is_favorite: false,
    play_count: 0
  },
  {
    id: "00000000-0000-4000-8000-000000000002",
    title: "Self Aware",
    artist: "Temper City",
    album: "Single",
    genre: "Electronic / Indie",
    mood: "After Hours",
    audio_url:
      "https://res.cloudinary.com/dakjhsfne/video/upload/v1782826752/Temper_City_-_Self_Aware_Sub._Espa%C3%B1ol_Lyrics_bcz0s7.mp3",
    cover_url: "https://res.cloudinary.com/dakjhsfne/image/upload/v1782826925/selfaware_zxy2th.jpg",
    lyrics_lrc: LYRICS_PLACEHOLDER,
    duration: 202,
    is_favorite: false,
    play_count: 0
  },
  {
    id: "00000000-0000-4000-8000-000000000003",
    title: "Beauty And A Beat",
    artist: "Justin Bieber feat. Nicki Minaj",
    album: "Single",
    genre: "Pop / Dance",
    mood: "Neon Pop",
    audio_url:
      "https://res.cloudinary.com/dakjhsfne/video/upload/v1782826754/Justin_Bieber_Nicki_Minaj_Beauty_And_A_Beat_Lyrics_odgxof.mp3",
    cover_url: "https://res.cloudinary.com/dakjhsfne/image/upload/v1782826925/beautyandabeat_zqyg5s.jpg",
    lyrics_lrc: LYRICS_PLACEHOLDER,
    duration: 228,
    is_favorite: false,
    play_count: 0
  },
  {
    id: "00000000-0000-4000-8000-000000000005",
    title: "Confident",
    artist: "Justin Bieber feat. Chance The Rapper",
    album: "Single",
    genre: "Pop / R&B",
    mood: "Gold Rush",
    audio_url:
      "https://res.cloudinary.com/dakjhsfne/video/upload/v1782826753/Justin_Bieber_-_Confident_Lyrics_ft._Chance_The_Rapper_ezymp4.mp3",
    cover_url: "https://res.cloudinary.com/dakjhsfne/image/upload/v1782826924/confident_kg0mye.jpg",
    lyrics_lrc: LYRICS_PLACEHOLDER,
    duration: 254,
    is_favorite: false,
    play_count: 0
  }
];

export const seedPlaylists: Playlist[] = [
  {
    id: "10000000-0000-4000-8000-000000000001",
    name: "Night Drive",
    description: "Una ruta privada para manejar despues de medianoche.",
    cover_url: seedTracks[0].cover_url,
    tracks: [seedTracks[0], seedTracks[1], seedTracks[3], seedTracks[4], seedTracks[2]]
  }
];
