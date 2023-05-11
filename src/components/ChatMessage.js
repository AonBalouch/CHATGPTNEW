import React from 'react'
import bot from '../assets/logo2.png'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import moment from 'moment'
import Image from './Image'
import CodeBlock from './CodeBlock';

/**
 * A chat message component that displays a message with a timestamp and an icon.
 *
 * @param {Object} props - The properties for the component.
 */
const ChatMessage = (props) => {
  const { id, createdAt, text, ai = false, selected, picUrl } = props.message

  return (
    <div key={id} className={`${ai && 'flex-row-reverse'} message`}>
      <div className={`${ai && 'flex-row-reverse'} message-w`}>
      <div className='message__wrapper'>
        {
          selected === 'dalle' && ai ?
            <>
              <div className='message__createdAt text-left'>
                (Requests to DALL·E are not stored as they are quickly removed from the server)
              </div>
                <Image url={text} />
            </>
            :
            <>
              {
                ai ? 
                  <ReactMarkdown className={`message__markdown text-left`}
                      children={text}
                      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                      components={{
                        code: CodeBlock,
                      }} />
                  :
                  <div className="message__markdown text-right">
                    {text.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        <span>{line}</span>
                        <br/> 
                      </React.Fragment>
                    ))}
                  </div>
              }
            </>
        }
        <div className={`${ai ? 'text-left' : 'text-right'} message__createdAt`}>{moment(createdAt).calendar()}</div>
        </div>

        <div className="message__pic">
          {
            ai ? <img className='w-8 h-8' src={bot} alt="GPT" /> :
              <img className='cover w-10 h-10 rounded-full' loading='lazy' src={picUrl} alt='profile pic' />
          }
        </div>
      </div>
    </div>
  )
}

export default ChatMessage