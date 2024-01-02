const JobProfile = require("../models/JobProfile")
const Category = require("../models/Categories")


exports.searchWithTagAndLocation = async (req, res)=>{
    try {
        const {state, tags} = req.query
        const query = {}
        if(state){
            query.state = state
        }
        if(tags){
            query.tags = { $in: tags.split(',')}
        }
        
        if (Object.keys(query).length === 0) {
            return res.status(400).json({ error: "Specifications must be specified" });
        }

        const searchResults = await JobProfile.find(query).populate('user');

        if (searchResults.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(searchResults)

    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}

exports.searchWithCategory = async (req, res)=>{
    try {
        const { categoryId } = req.params

        const checkField = await Category.findById(categoryId)
        if(!checkField) return res.status(400).json({error: "Invalid Category"})

        const seachResults = await JobProfile.find({field: categoryId})
        if(!seachResults) return res.stauts(400).json({ error: "No Artisans found"})
        
        res.status(200).json(seachResults)

    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}