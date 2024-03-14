import { useData } from "../../hooks/useData";
import { UserData } from "../../utils/types";
import { CrossButton } from "../buttons/CrossButton";
import { LoadingComponent } from "../other/LoadingComponent";
import { ActualUserView } from "../elements/ActualUserView";

export function MyAccount({ handleClean }) {
  const [user, setUser] = useData<UserData>("auth/user-data");

  if (!user) return <LoadingComponent></LoadingComponent>;
  return (
    <>
      <CrossButton handleClean={handleClean}></CrossButton>
      <ActualUserView user={user} setUser={setUser}></ActualUserView>
    </>
  );
}
