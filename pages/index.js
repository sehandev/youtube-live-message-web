import Head from "next/head"
import Link from "next/link"
import { useState } from "react"

export default function MessagesPage() {
  const [youtube_video_id, set_youtube_video_id] = useState("")

  return (
    <div className="container mx-auto">
      <Head>
        <title>동안교회 청소년부 예배 댓글</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="pt-8">
        <Link href="/">
          <div className="mb-8 cursor-pointer">
            <a className="text-xl font-bold">청소년부 실시간 예배 댓글</a>
          </div>
        </Link>
        <div className="mb-4">유튜브 비디오 아이디 입력</div>
        <input type="text" className="mr-4 p-1 text-gray-800" value={youtube_video_id} onChange={(event) => set_youtube_video_id(event.target.value)} />
        <Link href={`/messages?videoID=${youtube_video_id}`}>
          <a className="p-1 border border-white">불러오기</a>
        </Link>
      </main>

      <footer>
        <div className="absolute bottom-0 mb-4">&copy;청소년1부 교사 김성돈 (010-5397-8929)</div>
      </footer>
    </div>
  )
}
