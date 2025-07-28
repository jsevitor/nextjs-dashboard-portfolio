import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [latestAbout] = await prisma.about.findMany({
    orderBy: { updatedAt: "desc" },
    take: 1,
  });

  const [latestProject] = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
    take: 1,
  });

  const [latestSkill] = await prisma.skill.findMany({
    orderBy: { updatedAt: "desc" },
    take: 1,
  });

  const [latestContact] = await prisma.contact.findMany({
    orderBy: { updatedAt: "desc" },
    take: 1,
  });

  const lastUpdate = [
    latestAbout?.updatedAt,
    latestProject?.updatedAt,
    latestSkill?.updatedAt,
    latestContact?.updatedAt,
  ]
    .filter(Boolean)
    .sort((a, b) => b!.getTime() - a!.getTime())[0];

  return NextResponse.json({ lastUpdate });
}
