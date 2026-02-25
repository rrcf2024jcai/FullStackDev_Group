type Props = {
  currentUser: string;
};

export default function UserInfo({ currentUser }: Props) {
  return (
    <span className="user-info" style={{ opacity: 0.9 }}>
      Logged in as: {currentUser}
    </span>
  );
}