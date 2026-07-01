insert into public.tracks
  (id, title, artist, album, genre, mood, audio_url, cover_url, lyrics_lrc, duration, is_favorite, play_count)
values
  (
    '00000000-0000-4000-8000-000000000004',
    'Careless Whisper',
    'George Michael',
    'Single',
    'Pop / Sax / Classic',
    'Night Drive',
    'https://res.cloudinary.com/dakjhsfne/video/upload/v1782825188/George_Michael_-_Careless_Whisper_Lyrics_hjgxfz.mp3',
    'https://res.cloudinary.com/dakjhsfne/image/upload/v1782826925/carelesswhisper_meyvzv.jpg',
    '[00:00.00] Letras privadas no agregadas todavia
[00:08.00] Pega tu LRC desde Admin
[00:16.00] NOCTRA escucha privada',
    300,
    true,
    0
  ),
  (
    '00000000-0000-4000-8000-000000000001',
    'Redemption',
    'Kidwild ft. Nemzzz',
    'Single',
    'UK Rap / Hip-Hop',
    'After Hours',
    'https://res.cloudinary.com/dakjhsfne/video/upload/v1782850968/Kidwild_-_Redemption_Ft._Nemzzz_Music_Video_dhmt7o.mp3',
    'https://res.cloudinary.com/dakjhsfne/image/upload/v1782850968/redemption_fyut2z.jpg',
    '[00:00.00] Letras privadas no agregadas todavia
[00:08.00] Pega tu LRC desde Admin
[00:16.00] NOCTRA escucha privada',
    184,
    false,
    0
  ),
  (
    '00000000-0000-4000-8000-000000000002',
    'Self Aware',
    'Temper City',
    'Single',
    'Electronic / Indie',
    'After Hours',
    'https://res.cloudinary.com/dakjhsfne/video/upload/v1782826752/Temper_City_-_Self_Aware_Sub._Espa%C3%B1ol_Lyrics_bcz0s7.mp3',
    'https://res.cloudinary.com/dakjhsfne/image/upload/v1782826925/selfaware_zxy2th.jpg',
    '[00:00.00] Letras privadas no agregadas todavia
[00:08.00] Pega tu LRC desde Admin
[00:16.00] NOCTRA escucha privada',
    202,
    false,
    0
  ),
  (
    '00000000-0000-4000-8000-000000000003',
    'Beauty And A Beat',
    'Justin Bieber feat. Nicki Minaj',
    'Single',
    'Pop / Dance',
    'Neon Pop',
    'https://res.cloudinary.com/dakjhsfne/video/upload/v1782826754/Justin_Bieber_Nicki_Minaj_Beauty_And_A_Beat_Lyrics_odgxof.mp3',
    'https://res.cloudinary.com/dakjhsfne/image/upload/v1782826925/beautyandabeat_zqyg5s.jpg',
    '[00:00.00] Letras privadas no agregadas todavia
[00:08.00] Pega tu LRC desde Admin
[00:16.00] NOCTRA escucha privada',
    228,
    false,
    0
  ),
  (
    '00000000-0000-4000-8000-000000000005',
    'Confident',
    'Justin Bieber feat. Chance The Rapper',
    'Single',
    'Pop / R&B',
    'Gold Rush',
    'https://res.cloudinary.com/dakjhsfne/video/upload/v1782826753/Justin_Bieber_-_Confident_Lyrics_ft._Chance_The_Rapper_ezymp4.mp3',
    'https://res.cloudinary.com/dakjhsfne/image/upload/v1782826924/confident_kg0mye.jpg',
    '[00:00.00] Letras privadas no agregadas todavia
[00:08.00] Pega tu LRC desde Admin
[00:16.00] NOCTRA escucha privada',
    254,
    false,
    0
  )
on conflict (id) do update set
  title = excluded.title,
  artist = excluded.artist,
  album = excluded.album,
  genre = excluded.genre,
  mood = excluded.mood,
  audio_url = excluded.audio_url,
  cover_url = excluded.cover_url,
  lyrics_lrc = excluded.lyrics_lrc,
  duration = excluded.duration,
  is_favorite = excluded.is_favorite,
  updated_at = now();

insert into public.playlists (id, name, description, cover_url)
values (
  '10000000-0000-4000-8000-000000000001',
  'Night Drive',
  'Una ruta privada para manejar despues de medianoche.',
  'https://res.cloudinary.com/dakjhsfne/image/upload/v1782826925/carelesswhisper_meyvzv.jpg'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  cover_url = excluded.cover_url,
  updated_at = now();

insert into public.playlist_tracks (playlist_id, track_id, position)
values
  ('10000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000004', 1),
  ('10000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001', 2),
  ('10000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000003', 3),
  ('10000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000005', 4),
  ('10000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000002', 5)
on conflict (playlist_id, track_id) do update set
  position = excluded.position;
