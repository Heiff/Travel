const Io = require('../Io')
const Data = new Io('./Database/Travel.json')
const Classes = require('../Classes/Classes')

const PostTravel = async(req,res) => {
const { name,price,date,duration } = req.body;
let yes = true;
const data = await Data.read()
if (data.length == 0) {
    const newData = new Classes(
        name,
        price,
        date,
        duration
    )
    await Data.write([newData])
    res.status(201).json({message:"created"})
}
for (let i = 0; i < data.length; i++) {
    if (data[i].name == name) {
        yes = false
        await Data.write(data)
        res.status(401).json({message:"error"})
    }
}
if(yes){
    const newData = new Classes(
        name,
        price,
        date,
        duration
       )
      
       data.push(newData);
       await Data.write(data)
       res.status(201).json({message:'created'})
}
}

const GetTravel = async(req,res) => {
    const data = await Data.read();
    const { price,date,duration } = req.body;

    const DataFilter = data.filter(el => {
       if (el.price == price && el.date >= date && el.duration == duration) {
        return el
       }
    })
    console.log(DataFilter);
    res.status(200).json({Travels:DataFilter})
}

module.exports = {
    PostTravel,
    GetTravel
}