require('dotenv').config();
const mongoose = require('mongoose');

// ✅ Correct paths (go one level up from scripts/)
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Song = require('../models/Song');
const User = require('../models/User');
const Playlist = require('../models/Playlist');

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // 1. Clear existing data
    await Promise.all([
      Artist.deleteMany({}),
      Album.deleteMany({}),
      Song.deleteMany({}),
      User.deleteMany({}),
      Playlist.deleteMany({})
    ]);

    // 2. Create Artist
    const artist = await Artist.create({
      name: 'Daft Punk',
      genre: 'Electronic',
      bio: 'French electronic music duo.'
    });
    console.log(`Created Artist: ${artist.name}`);

    // 3. Create Album (linked to Artist)
    const album = await Album.create({
      title: 'Discovery',
      releaseYear: 2001,
      artist: artist._id,
      coverImage: 'https://example.com/cover.jpg'
    });
    console.log(`Created Album: ${album.title}`);

    // 4. Create Song (linked to Album & Artist)
    const song = await Song.create({
      title: 'One More Time',
      duration: 320,
      album: album._id,
      artist: artist._id
    });
    console.log(`Created Song: ${song.title}`);

    // 5. Create User
    const user = await User.create({
      username: 'music_fan_01',
      email: 'fan@example.com',
      password: 'hashed_password_123'
    });
    console.log(`Created User: ${user.username}`);

    // 6. Create Playlist (linked to User & Songs)
    const playlist = await Playlist.create({
      name: 'Gym Jams',
      description: 'High energy tracks',
      user: user._id,
      songs: [song._id]
    });
    console.log(`Created Playlist: ${playlist.name}`);

    console.log('✅ Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Failed:', error);
    process.exit(1);
  }
}

seed();
