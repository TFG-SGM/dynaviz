import { useParams } from "react-router-dom";
import { ModelEditor } from "../components/3dModel/ModelEditor";
import { useData } from "../hooks/useData";
import { UserData } from "../utils/types";
import { useEffect, useState } from "react";

export function EditorPage() {
  const { patientId: paramPatientId } = useParams();
  const [user] = useData<UserData>("auth/user-data");
  const [patientId, setPatientId] = useState(paramPatientId);

  useEffect(() => {
    if (!patientId && user) {
      setPatientId(user._id);
    }
  }, [user]);

  return (
    <>
      {patientId && (
        <div>
          <ModelEditor patientId={patientId}></ModelEditor>
        </div>
      )}
    </>
  );
}
