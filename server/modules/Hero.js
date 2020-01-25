const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  title: { type: String},
  banners: { type: String},
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  scores: {
    difficult: { type: Number },
    skill: { type: Number },
    attack: { type: Number},
    survive: { type: Number}
  },
  suggestions: {
    main: {name: {type: String}, url: {type: String}}, 
    indirect: {name: {type: String}, url: {type: String}},
    summonerSkills: [{name: {type: String}, url: {type: String}},]
  },
  skills:[{
    icon: { type: String },
    name: { type: String },
    delay: { type: String },
    cost: { type: String },
    desc: { type: String },
    tip: { type: String}
  }],
  items1:  [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  useTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },
  partners: {
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
    desc: { type: String }
}
})

module.exports = mongoose.model('Hero', schema, 'heroes')