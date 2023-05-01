import express from "express";
import { Router } from "express";
const router = Router();

router.get("/data", async (req, res) => {
  try {
    // res.send("hello data");
    res.status(200).json(data);
  } catch (error) {
    console.log("error404 in /api/data");
  }
});
export default router;
const data = [
  {
    id: 1,
    content: "abc",
  },
  {
    id: 2,
    content: "def",
  },
  {
    id: 3,
    content: "ghi",
  },
  {
    id: 4,
    content: "jkl",
  },
  {
    id: 5,
    content: "mno",
  },
  {
    id: 6,
    content: "pqr",
  },
  {
    id: 7,
    content: "stu",
  },
  {
    id: 8,
    content: "vwx",
  },
  {
    id: 9,
    content: "yz",
  },
];
