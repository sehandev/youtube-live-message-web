import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import { withRouter } from "next/router"

const axios = require("axios")

function MessagesPage({ router }) {
  const { videoID } = router.query

  const [message_list, set_message_list] = useState({
    youth1: [],
    youth1p: [],
    youth2: [],
    youth3: [],
    etc: [],
  })

  useEffect(() => {
    if (router.isReady) {
      axios
        .get("https://www.googleapis.com/youtube/v3/videos", {
          params: {
            key: "AIzaSyBCiEtaEcng3jK_jxN0d16UKUUbCshERQY",
            part: "liveStreamingDetails",
            id: videoID,
          },
        })
        .then(function (response) {
          let live_streaming_chat_id = response.data.items[0].liveStreamingDetails.activeLiveChatId
          console.log(live_streaming_chat_id)
          axios
            .get("https://youtube.googleapis.com/youtube/v3/liveChat/messages", {
              params: {
                key: "AIzaSyBCiEtaEcng3jK_jxN0d16UKUUbCshERQY",
                part: "snippet",
                liveChatId: live_streaming_chat_id,
              },
            })
            .then(function (response) {
              let items = response.data.items
              let tmp_message_list = {
                youth1: [],
                youth1p: [],
                youth2: [],
                youth3: [],
                etc: [],
              }

              items.forEach((item) => {
                let message_text = item.snippet.textMessageDetails.messageText
                if (message_text.includes("1")) {
                  if (message_text.includes("플러스") || message_text.includes("+")) {
                    tmp_message_list.youth1p.push(message_text)
                  } else {
                    tmp_message_list.youth1.push(message_text)
                  }
                } else if (message_text.includes("2")) {
                  tmp_message_list.youth2.push(message_text)
                } else if (message_text.includes("3")) {
                  tmp_message_list.youth3.push(message_text)
                } else {
                  tmp_message_list.etc.push(message_text)
                }
              })

              set_message_list({
                youth1: tmp_message_list.youth1,
                youth1p: tmp_message_list.youth1p,
                youth2: tmp_message_list.youth2,
                youth3: tmp_message_list.youth3,
                etc: tmp_message_list.etc,
              })
            })
            .catch(function (error) {
              console.log(error)
            })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }, [router])

  return (
    <div className="container mx-auto">
      <Head>
        <title>동안교회 청소년부 예배 댓글</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="pt-8" style={{ minHeight: "95vh" }}>
        <Link href="/">
          <div className="mb-8 cursor-pointer">
            <a className="text-xl font-bold">청소년부 실시간 예배 댓글</a>
          </div>
        </Link>

        <div className="p-2 mb-4 border border-white">
          <div className="text-lg font-semibold mb-2">청소년 1부</div>
          <div>
            {message_list.youth1.map((value, index) => {
              return <div key={index}>{value}</div>
            })}
          </div>
        </div>

        <div className="p-2 mb-4 border border-white">
          <div className="text-lg font-semibold mb-2">청소년 1부 플러스</div>
          <div>
            {message_list.youth1p.map((value, index) => {
              return <div key={index}>{value}</div>
            })}
          </div>
        </div>

        <div className="p-2 mb-4 border border-white">
          <div className="text-lg font-semibold mb-2">청소년 2부</div>
          <div>
            {message_list.youth2.map((value, index) => {
              return <div key={index}>{value}</div>
            })}
          </div>
        </div>

        <div className="p-2 mb-4 border border-white">
          <div className="text-lg font-semibold mb-2">청소년 3부</div>
          <div>
            {message_list.youth3.map((value, index) => {
              return <div key={index}>{value}</div>
            })}
          </div>
        </div>

        <div className="p-2 mb-4 border border-white">
          <div className="text-lg font-semibold mb-2">기타</div>
          <div>
            {message_list.etc.map((value, index) => {
              return <div key={index}>{value}</div>
            })}
          </div>
        </div>
      </main>

      <footer>
        <div className="mb-4">&copy;청소년1부 교사 김성돈 (010-5397-8929)</div>
      </footer>
    </div>
  )
}

export default withRouter(MessagesPage)
