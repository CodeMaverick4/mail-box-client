import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function useMails(userEmail) {
  const [mails, setMails] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const prevMailIds = useRef(new Set());

  const fetchMails = async () => {
    try {
      const url = `https://todo-app-75d12-default-rtdb.firebaseio.com/mails.json`;
      const response = await axios.get(url);

      if (response.data) {
        let unread = 0;
        const mailList = Object.keys(response.data).map((key) => {
          const mail = response.data[key];
          if (!mail.read && mail.to === userEmail) unread += 1;
          return { id: key, ...mail };
        });

        const currentIds = new Set(mailList.map((m) => m.id));
        const isChanged =
          mailList.length !== prevMailIds.current.size ||
          [...currentIds].some((id) => !prevMailIds.current.has(id));

        if (isChanged) {
          prevMailIds.current = currentIds;
          setMails(mailList);
        }
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error("Error fetching mails:", error);
    }
  };

  const markAsRead = async (mail) => {
    try {
      const updateUrl = `https://todo-app-75d12-default-rtdb.firebaseio.com/mails/${mail.id}.json`;
      await axios.put(updateUrl, { ...mail, read: true });

      setMails((prev) =>
        prev.map((m) => (m.id === mail.id ? { ...m, read: true } : m))
      );
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error("Error marking mail as read:", error);
    }
  };

  const deleteMail = async (mail) => {
    try {
      const deleteUrl = `https://todo-app-75d12-default-rtdb.firebaseio.com/mails/${mail.id}.json`;
      await axios.delete(deleteUrl);

      setMails((prev) => prev.filter((m) => m.id !== mail.id));
      if (!mail.read && mail.to === userEmail) {
        setUnreadCount((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Error deleting mail:", error);
    }
  };

  useEffect(() => {
    if (!userEmail) return;

    fetchMails(); 
    const interval = setInterval(fetchMails, 2000);

    return () => clearInterval(interval);
  }, [userEmail]);

  return { mails, unreadCount, markAsRead, deleteMail };
}
