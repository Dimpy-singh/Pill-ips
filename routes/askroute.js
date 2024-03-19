import express from "express";
var router = express.Router();

router.get("/",async(req,res)=>{
    res.render("ask")
})

async function query(data) {
  const response = await fetch(
    "http://localhost:3000/api/v1/prediction/b44dbdd0-9f66-400e-8e7b-dd1632c2f3df",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

router.post("/", async (req, res) => {
  let prompt = `Recommend a medicine for the treatment of conditions related to ${req.body.problem}. Provide the details in the following format: [{name: "Medicine Name", side_effects: "List of side effects", imageurl: "Image URL",uses:}]. if you dont get the exact match find probable one and dont wrap the array in quotes return only array`;

  let cures=[];
 await query({ question: prompt }).then((response) => {
    if (response.text !== "No medicine available yet in our database") {
      const resultArray = eval(response.text);
      cures = resultArray;
    } else {
      res.json(`${response.text} for ${req.body.problem}`);
    }
  });
  console.log(cures);
  res.render("output",{cures:cures});
});

export default router;