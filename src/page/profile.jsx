import { users } from "../App"
import UserProfile from "../components/profile_list"

export default function ProfilePage() {
    return (
      <UserProfile user={users[0]}></UserProfile>
    );
}