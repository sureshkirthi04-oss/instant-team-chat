function Message({ message }) {
  return (
    <div className="message">
      <div className="message-header">
        <strong>{message.username}</strong>

        <span>
          {new Date(message.created_at).toLocaleTimeString()}
        </span>
      </div>

      <p>{message.content}</p>
    </div>
  );
}

export default Message;