import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

// 네비게이션 메뉴 항목
const navItems = [
  { name: "홈", path: "/" },
  { name: "후보자 정보", path: "/candidates" },
  { name: "공약 정보", path: "/pledges" },
  { name: "공약 여론", path: "/policy-reception" },
  { name: "자산 공개", path: "/assets" },
  { name: "투표 방법", path: "/voting-info" },
];
