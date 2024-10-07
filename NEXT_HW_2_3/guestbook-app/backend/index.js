const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

// 방명록 항목 추가
app.post("/api/guestbook", async (req, res) => {
  const { name, message, password } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO guestbook (name, message, password) VALUES ($1, $2, $3) RETURNING *",
      [name, message, password]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 방명록 목록 가져오기
app.get("/api/guestbook", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, message, created_at, likes FROM guestbook ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 방명록 항목 수정
app.put("/api/guestbook/:id", async (req, res) => {
  const { id } = req.params;
  const { message, password } = req.body;
  try {
    const result = await pool.query("SELECT password FROM guestbook WHERE id = $1", [id]);
    if (result.rows.length > 0 && result.rows[0].password === password) {
      const updateResult = await pool.query(
        "UPDATE guestbook SET message = $1 WHERE id = $2 RETURNING id, name, message, created_at, likes",
        [message, id]
      );
      res.json(updateResult.rows[0]);
    } else {
      res.status(403).json({ error: "비밀번호가 일치하지 않습니다." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 방명록 항목 삭제
app.delete("/api/guestbook/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const result = await pool.query("SELECT password FROM guestbook WHERE id = $1", [id]);
    if (result.rows.length > 0 && result.rows[0].password === password) {
      await pool.query("DELETE FROM guestbook WHERE id = $1", [id]);
      res.json({ message: "삭제되었습니다." });
    } else {
      res.status(403).json({ error: "비밀번호가 일치하지 않습니다." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 좋아요 기능 추가
app.post("/api/guestbook/:id/like", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "UPDATE guestbook SET likes = likes + 1 WHERE id = $1 RETURNING id, name, message, created_at, likes",
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 검색 기능 추가
app.get("/api/guestbook/search", async (req, res) => {
  const { term } = req.query;
  try {
    const result = await pool.query(
      "SELECT id, name, message, created_at, likes FROM guestbook WHERE name ILIKE $1 OR message ILIKE $1",
      [`%${term}%`]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 서버 실행
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
