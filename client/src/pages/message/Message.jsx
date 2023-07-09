import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Message.scss";
import newRequest from "../../utils/newRequest";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const Message = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages/`,message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("messages");
    },
  });
  const handleSubmit = (e)=>{
    e.preventDefault()
    mutation.mutate({
      conversationId: id,
      desc:e.target[0].value,
    })
    e.target[0].value=''
  }

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> {`>`} John Doe {`>`}
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "something went wrong"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div className={m.userId === currentUser._id ? "item owner" : "item"} key={m._id}>
                <img
                  src={m.userId === currentUser._id ? currentUser.img || "/img/heart.png": ''}
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
