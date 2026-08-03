-- DROP TABLE IF EXISTS posts removes an older version of the table if one is present. Including it makes the script idempotent: running it twice produces the same result as running it once.
-- DROP TABLE IF EXISTS posts;

-- CREATE TABLE posts (...) defines the schema for the post table.

-- CREATE TABLE IF NOT EXISTS posts (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   title TEXT NOT NULL,
--   image TEXT NOT NULL,
--   author TEXT NOT NULL,
--   createdAt INTEGER NOT NULL,
--   teaser TEXT NOT NULL,
--   content TEXT NOT NULL
-- );

-- SQL INTEGER = TypeScript number.

INSERT INTO posts (title, image, author, createdAt, teaser, content) VALUES

(
    'Black: The Absence, Not the Presence, of Color',
    'colorful-umbrella.jpg',
    'Peter Parker',
    1743120000,
    'Scientifically, black is not a color but rather the absence of all colors, occurring when an object absorbs nearly all light wavelengths instead of reflecting them.',
    '<p>When you think about the rainbow, you see a vibrant spectrum of hues.</p>'
  ),
  (
    'Flowers: Nature''s Muse for Design',
    'flowers.jpg',
    'Peter Parker',
    1745452800,
    'Flowers inspire design with their color palettes, structure, and balance between repetition and variation.',
    '<p>Designers borrow from flowers all the time: layered composition, contrasting accents, and natural hierarchy.</p>'
  ),
  (
    'UDesign''s Harmony: Core Purpose and Supporting Details',
    'sailing.jpg',
    'Peter Parker',
    1748736000,
    'Strong design starts with one clear core idea, then adds supporting details that reinforce it.',
    '<p>A useful mental model is major and minor elements.</p>'
  );
