import { type Request, type Response } from "express";
import { getAllPosts, getPostBySlug, slugify } from "../models/postModel.js";
