/* Variables Firebase */
const firebaseConfig = {
  apiKey: "AIzaSyBDis_AlHkycPysHyUBPpQIejhJCX8I1gI",
  authDomain: "todorb1.firebaseapp.com",
  databaseURL: "https://todorb1-default-rtdb.firebaseio.com",
  projectId: "todorb1",
  storageBucket: "todorb1.appspot.com",
  messagingSenderId: "725178108972",
  appId: "1:725178108972:web:39261a2ca1d53ba0b29589",
  measurementId: "G-JKBC9QESTE",
};
const app = firebase.initializeApp(firebaseConfig);
const db = app.database();
const ref = db.ref("tasks/");

/* Variable DOM */
const btnAdd = document.getElementById("btn_add");
const input = document.getElementById("input");
const displayTasks = document.getElementById("taskes-c");

/* reading data */

/* printing the tasks */
ref.on("value", (s) => {
  displayTasks.innerHTML = "";

  console.log(s.val());

  s.forEach((el) => {
    let divTask = document.querySelectorAll(".task");

    let task = `
                <div class="task-c" style="background-color:${el.val().clr};">
                  <div class="left-side">
                    <div class="task"
                    data-ok="${el.val().ok}"
                      data-index="${divTask.length}"
                      onclick="updating(${el.val().id - 1})">
                       ${el.val().task}
                      </div>
                    <div class="timing">
                    <i class="far fa-clock 2x" aria-hidden="true"></i>
                    &nbsp
                    ${el.val().time}
                    </div>
                  </div>
                  <div class="right-side">
                    <div onclick="removeTask(${el.val().id} - 1)">
                      <i class="fa fa-minus-circle" aria-hidden="true"></i>
                    </div>
                    <div><i class="fas fa-edit"></i></div>
                  </div>
                </div>
                `;
    displayTasks.innerHTML += task;
  });

  //printCompleted
  let dt = document.querySelectorAll(".task");
  dt.forEach((el) => {
    let ok = eval(el.getAttribute("data-ok"));
    let i = Number(el.getAttribute("data-index"));

    if (ok == true) {
      dt[i].classList.add("ok");
    }
  });
});

// update Completing Task
function updating(id) {
  ref.child(id).once("value", (s) => {
    let checkOk = s.val().ok;
    if (checkOk == true) {
      ref.child(id).update({ ok: false });
      // console.log("upF key:", id);
    } else if (checkOk == false) {
      ref.child(id).update({ ok: true });
      // console.log("upT key:", id);
    }
  });
}

//add Task
btnAdd.addEventListener("click", () => {
  if (input.value == "") {
    alert("a7madi ktab chi 7aja!");
  } else {
    ref
      .limitToLast(1)
      .once("value")
      .then((s) => {
        /* clr */
        let clrSlctd = document.querySelector(
          "input[name='clr']:checked"
        ).value;
        /* date and time */
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let fullDate = `${day}/${month}/${year}`;
        let hour = date.getHours();

        let minutes =
          (date.getMinutes()) < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        let fullTime = `${hour}:${minutes}`;
        /* btnAdd*/
        if (s.exists() == 0) {
          ref.child(0).set({
            id: 1,
            task: input.value,
            ok: false,
            time: `${fullTime} || ${fullDate}`,
            clr: clrSlctd,
          });
        } else {
          s.forEach((cs) => {
            let lastId = cs.val().id;
            ref.child(lastId).set({
              id: ++lastId,
              task: input.value,
              ok: false,
              time: `${fullTime} -- ${fullDate}`,
              clr: clrSlctd,
            });
          });
        }
      });
  }
});

// remove Task
function removeTask(id) {
  ref.child(id).remove();
}

/* <div class="task-c">
                    <div class="left-side">
                      <div class="task" 
                      data-ok="${el.val().ok}"
                      data-index="${divTask.length}"
                      
                      onclick="updating(${el.val().id - 1})"> 
                            ${el.val().id} - ${el.val().task}
                      </div>
                    </div>
                    <div class="right-side">
                      <span onclick="removeTask(${el.val().id} - 1)">x</span>
                      <div class="timing">${el.val().time}</div>
                    </div>
                  </div> */
