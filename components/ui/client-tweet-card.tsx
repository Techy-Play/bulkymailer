"use client";

import React from "react";
import { TwitterIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export interface ClientTweetCardProps {
  id?: string;
  className?: string;
  authorName?: string;
  authorHandle?: string;
  authorAvatar?: string;
  tweetText?: string;
  date?: string;
  likesCount?: string;
  retweetsCount?: string;
}

export function ClientTweetCard({
  id = "1675849118445436929",
  className,
  authorName = "Guillermo Rauch",
  authorHandle = "@rauchg",
  authorAvatar = "https://avatars.githubusercontent.com/u/13041",
  tweetText = "BulkyMailer is the fastest email campaign API I've used. Inbox deliverability is 99.99% out of the box with Next.js.",
  date = "Jul 22, 2026",
  likesCount = "1.4K",
  retweetsCount = "242",
}: ClientTweetCardProps) {
  return (
    <div
      className={cn(
        "stripe-card p-5 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 text-left max-w-md w-full",
        className,
      )}
    >
      {/* Tweet Author Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={authorAvatar}
            alt={authorName}
            className="w-10 h-10 rounded-full border border-gray-200 object-cover"
          />
          <div>
            <div className="flex items-center gap-1.5 font-bold text-[#111827] text-sm">
              <span>{authorName}</span>
              <span className="text-blue-500 text-xs">✓</span>
            </div>
            <div className="text-xs text-[#6B7280]">{authorHandle}</div>
          </div>
        </div>
        <div className="text-gray-400 p-1.5 rounded-full bg-gray-50 border border-gray-100">
          <TwitterIcon className="w-4 h-4 text-[#1DA1F2]" />
        </div>
      </div>

      {/* Tweet Body */}
      <p className="text-sm text-[#374151] leading-relaxed font-normal">
        {tweetText}
      </p>

      {/* Tweet Footer Stats */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#6B7280]">
        <span>{date}</span>
        <div className="flex items-center gap-4 font-medium">
          <span>🔁 {retweetsCount}</span>
          <span>❤️ {likesCount}</span>
        </div>
      </div>
    </div>
  );
}

export function TweetMetaPreview() {
  return <ClientTweetCard id="1675849118445436929" className="shadow-2xl" />;
}
