
onEvent('block.loot_tables', event => {
	//Ore should drop the dust
	event.addSimpleBlock('mna:vinteum_ore', 'mna:vinteum_dust')
});

onEvent('tags.items', event => {
	//Missing tags??
	event.add('forge:ingots/vinteum', 'mna:vinteum_ingot')
	event.add('forge:ingots/transmuted_silver', 'mna:transmuted_silver')
})

onEvent('recipes', event => {
	var recipeNamesToRemove = [
		'mna:runeforge_alt',
	]
    recipeNamesToRemove.forEach((name) => {
	event.remove({id: name})
	})
	
// [| stone_rune_blank |] //
	event.remove({id: 'mna:stone_runes/rune_blank'})
event.shaped('2x mna:stone_rune_blank', [
	'ABA',
	'BBB',
	'ABA'
  ], {
	A: Item.empty,
	B: 'create:andesite_alloy'
  }).id("mbm2:stone_rune_blank")

// [| manaweaving_altar |] //
	event.remove({id: 'mna:manaweaving_altar'})
event.shaped('mna:manaweaving_altar', [
	'ABA',
	'ACA',
	'ADA'
  ], {
	A: 'mna:transmuted_silver',
	B: 'mna:decoration/arcane_sandstone',
	C: 'mna:ritual_focus_minor',
	D: 'mna:decoration/arcane_stone'
  }).id("mbm2:manaweaving_altar")

// [| improvised_manaweaver_wand |] //
event.remove({id: 'mna:improvised_manaweaver_wand'})
event.shaped(Item.of('mna:improvised_manaweaver_wand', '{Damage:0}'), [
	'  B',
	' C ',
	'C  '
  ], {
B: '#mna:improvised_manaweave_wand_caps',
C: '#forge:rods/wooden'
  }).id("mbm2:improvised_manaweaver_wand")

  // Vinteum Coated tier_1_magical_alloy
	event.remove({id: 'mna:vinteum_coated_iron'})
	event.remove({id: 'mna:vinteum_bar_blast_furnace'})
	event.remove({id: 'mna:vinteum_bar'})
	event.recipes.createMixing('mna:vinteum_coated_iron', [`#forge:ingots/tier_1_magical_alloy`, 'mna:vinteum_dust']).heated().id(`mbm2:vinteum_coated_tier_1_magical_alloy`)
  	global.tinkersMelting(event, 'kubejs:molten_slag', 50, 'kubejs:molten_vinteum', 90, 'mna:vinteum_coated_iron', 1200, 142, `mbm2:smeltery/melting/metal/vinteum_coated_tier_1_magical_alloy`)
	event.custom({
		"type": "mna:arcane-furnace",
		"tier": 1,
		"input": 'mna:vinteum_coated_iron',
		"output": 'mna:vinteum_ingot',
		"outputQuantity": 1,
		"burnTime": 200
	})

	// Vinteum Coated tier_1_magical_alloy
	  event.remove({id: 'mna:purified_vinteum_coated_iron'})
	  event.remove({id: 'mna:purified_vinteum_bar_blast_furnace'})
	  event.remove({id: 'mna:purified_vinteum_bar'})
	  event.recipes.createMixing('mna:purified_vinteum_coated_iron', [`#forge:ingots/tier_1_magical_alloy`, 'mna:purified_vinteum_dust']).superheated().id(`mbm2:purified_vinteum_coated_tier_1_magical_alloy`)
	  event.custom({
		  "type": "mna:arcane-furnace",
		  "tier": 2,
		  "input": 'mna:purified_vinteum_coated_iron',
		  "output": 'mna:purified_vinteum_ingot',
		  "outputQuantity": 1,
		  "burnTime": 200
	  })
	
	//IDK why this needed a recipe but here ya go
	event.shaped('4x mna:decoration/vinteum_arcane_stone', [' A ','ABA',' A '], {A: 'mna:decoration/arcane_stone',B: 'mna:superheated_vinteum_ingot'}).id('mbm2:vinteum_arcane_stone')

	
	//Mystic Focus Minor
	event.remove({id: 'mna:ritual_focus_minor'})
	event.shaped('mna:ritual_focus_minor', ['ABA','CDC','ABA'], {A: '#forge:glass/colorless',B: 'elementalcraft:drenched_iron_ingot',C: 'mna:superheated_vinteum_ingot',D: 'ars_nouveau:source_gem'}).id(`mbm2:ritual_focus_minor`)
	event.custom({
		"type": "ars_nouveau:enchanting_apparatus",
		"reagent": [
		  {
			"item": 'ars_nouveau:source_gem'
		  }
		],
		"pedestalItems": [
		{
		  "item": Ingredient.of('mna:superheated_vinteum_ingot').toJson(),
		},
		{
		  "item": Ingredient.of('elementalcraft:drenched_iron_ingot').toJson(),
		},
		{
		  "item": Ingredient.of('botania:mana_glass').toJson(),
		},
		],
		"output": {
		  "item": 'mna:ritual_focus_minor'
		},
		"sourceCost": 1000,
		"keepNbtOfReagent": false
	  }).id(`mbm2:enchanting_apparatus/ritual_focus_minor`)

//MnA Mark Recipes
event.recipes.createDeploying('mna:mark_of_the_fey', ['mna:stone_rune_blank', 'ars_nouveau:green_archwood_sapling']).id(`mbm2:mark_fey`)
event.recipes.createDeploying('mna:mark_of_the_council', ['mna:stone_rune_blank', 'mna:vinteum_dust']).id(`mbm2:mark_council`)
event.recipes.createDeploying('mna:mark_of_the_nether', ['mna:stone_rune_blank', 'minecraft:nether_brick']).id(`mbm2:mark_nether`)
event.recipes.createDeploying('mna:mark_of_the_undead', ['mna:stone_rune_blank', '#forge:wither_bones']).id(`mbm2:mark_undead`)

//Automatable chimerite
	event.custom({
		"type": "thermal:crystallizer",
		"ingredients": [
		  {
			"fluid": "kubejs:crystal_catalyst_mixture",
			"amount": 1000
		  },
		  {
			"item": "mna:vinteum_dust"
		  },
		  {
			"item": "minecraft:coal"
		  }
		],
		"result": [
		  {
			"item": "mna:chimerite_gem"
		  }
		]
	  }).id(`mbm2:crystallizer/chimerite_t1`)
	  event.custom({
		"type": "thermal:crystallizer",
		"ingredients": [
		  {
			"fluid": "kubejs:crystal_catalyst_mixture",
			"amount": 1500
		  },
		  {
			"item": "mna:arcane_compound"
		  },
		  {
			"item": "minecraft:diamond"
		  }
		],
		"result": [
		  {
			"item": "mna:chimerite_gem",
			"count": 2
		  }
		]
	  }).id(`mbm2:crystallizer/chimerite_t2`)
	  event.custom({
		"type": "thermal:crystallizer",
		"ingredients": [
		  {
			"fluid": "kubejs:crystal_catalyst_mixture",
			"amount": 2000
		  },
		  {
			"item": "mna:arcane_ash"
		  },
		  {
			"item": "minecraft:emerald"
		  }
		],
		"result": [
		  {
			"item": "mna:chimerite_gem",
			"count": 3
		  }
		]
	  }).id(`mbm2:crystallizer/chimerite_t3`)
	  event.custom({
		"type": "thermal:crystallizer",
		"ingredients": [
		  {
			"fluid": "kubejs:crystal_catalyst_mixture",
			"amount": 3000
		  },
		  {
			"item": "mna:purified_vinteum_dust"
		  },
		  {
			"item": "botania:quartz_mana"
		  }
		],
		"result": [
		  {
			"item": "mna:chimerite_gem",
			"count": 4
		  }
		]
	  }).id(`mbm2:crystallizer/chimerite_t4`)

	//Chimerite Casing
	event.custom({
		"type": "mna:manaweaving-recipe",
		"tier": 2,
		"output": "kubejs:transmuted_casing",
		"items": [
			"kubejs:transmuted_silver_plate",
			"mna:chimerite_gem",
			"kubejs:transmuted_silver_plate",		
			"mna:chimerite_gem",
			"mna:chimerite_gem",
			"mna:chimerite_gem",
			"kubejs:transmuted_silver_plate",
			"mna:chimerite_gem",
			"kubejs:transmuted_silver_plate"
		],
		"patterns": [
			"mna:knot2",
			"mna:square",
			"mna:triangle",
			"mna:square",
			"mna:knot"
		]
	})

	//Heated Vinteum Blocks
	event.shaped('kubejs:heated_vinteum_block', ['AAA','AAA','AAA'], {A: 'mna:superheated_vinteum_ingot'}).id(`mbm2:heated_vinteum_block_compacting`)
	event.shapeless(`9x mna:superheated_vinteum_ingot`, ['kubejs:heated_vinteum_block']).id(`mbm2:heated_vinteum_block_uncompacting`)
	event.custom({
		"type": "mna:arcane-furnace",
		"tier": 1,
		"input": 'mna:vinteum_block',
		"output": 'kubejs:heated_vinteum_block',
		"burnTime": 1800
	})
});

