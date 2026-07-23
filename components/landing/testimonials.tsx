"use client";

import { ClientTweetCard } from "@/registry/magicui/client-tweet-card";
import { Slideshow } from "@/components/ui/slideshow";

const TWEETS = [
  <ClientTweetCard
    key="t1"
    id="1675849118445436929"
    authorName="Guillermo Rauch"
    authorHandle="@rauchg"
    authorAvatar="https://avatars.githubusercontent.com/u/13041"
    tweetText="BulkyMailer is the fastest email campaign API I've used. Inbox deliverability is 99.99% out of the box with Next.js."
    date="Jul 22, 2026"
    likesCount="1.4K"
    retweetsCount="242"
    className="shadow-md max-w-xl mx-auto"
  />,
  <ClientTweetCard
    key="t2"
    id="1675849118445436930"
    authorName="Shu Ding"
    authorHandle="@shuding_"
    authorAvatar="https://avatars.githubusercontent.com/u/3676859"
    tweetText="Switched our broadcast dispatch to BulkyMailer. Zero bounce flags, sub-50ms latency, and clean TypeScript SDK."
    date="Jul 20, 2026"
    likesCount="980"
    retweetsCount="115"
    className="shadow-md max-w-xl mx-auto"
  />,
  <ClientTweetCard
    key="t3"
    id="1675849118445436931"
    authorName="Lee Robinson"
    authorHandle="@leerob"
    authorAvatar="https://avatars.githubusercontent.com/u/9113740"
    tweetText="The developer UX on BulkyMailer is incredible. Built by Lokesh Paneru — automated DKIM/SPF setup in 1 click."
    date="Jul 18, 2026"
    likesCount="2.1K"
    retweetsCount="380"
    className="shadow-md max-w-xl mx-auto"
  />,
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl text-left mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Social Proof Slideshow
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Loved by founders & engineering leaders.
          </h2>
          <p className="mt-3 text-base text-[#4B5563]">
            Here is what leaders say on X (Twitter) about BulkyMailer's 99.99% deliverability engine.
          </p>
        </div>

        {/* Interactive Slideshow Carousel */}
        <Slideshow items={TWEETS} autoPlay={true} interval={4500} />

      </div>
    </section>
  );
}
