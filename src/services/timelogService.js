import { get, ref } from "@firebase/database";
import { fireDB } from "./firebase";

class TimelogManager {
  addTimelog(uid, stime, etime, title) {}
  async getAllTimelog(uid) {
    const timelogRef = ref(fireDB, `/user-timelogs/${uid}`);

    const snapshot = await get(timelogRef);

    if (!snapshot.exists()) {
      console.log("Timelogs doesn't exists");
      return {};
    }
    const timelogs = snapshot.val();
  }
  syncTimelog() {}
}
