function recalculateAll() {
	recalculateMods();
	recalculateHp();
	recalculateOtherStatistics();
	recalculateAttacks();
	recalculateXp();
}

function recalculateMods() {
	recalculateMod('str');
	recalculateMod('dex');
	recalculateMod('con');
	recalculateMod('int');
	recalculateMod('wis');
	recalculateMod('cha');
}

function recalculateMod(prefix) {
	var roll = parseInt($("#" + prefix + "Roll").val()) || 0;
	var racial = parseInt($("#" + prefix + "Racial").val()) || 0;
	var misc1 = parseInt($("#" + prefix + "Misc1").val()) || 0;
	var misc2 = parseInt($("#" + prefix + "Misc2").val()) || 0;
	var misc3 = parseInt($("#" + prefix + "Misc3").val()) || 0;
	var score = roll + racial + misc1 + misc2 + misc3;
	var mod = (score - 10) / 2;

	var element = $("#" + prefix + "Mod");
	element.val(Math.trunc(mod));
	element.prop('title', 'Score: ' + score);
}

function recalculateHp() {
	var conMod = parseInt($('#conMod').val()) || 0;
	var hpTemp = parseInt($('#hpTemp').val()) || 0;
	var hpTotal = conMod + hpTemp;
	var damage = parseInt($('#damage').val()) || 0;
	var hpCurrent = hpTotal - damage;
	var hpPercent = (hpCurrent < 1 ? 0 : Math.trunc(hpCurrent / hpTotal * 100));
	var nonlethal = parseInt($('#nonlethal').val()) || 0;

	$('#hpTotal').val(hpTotal);
	$('#hpCurrent').val(hpCurrent);

	setProgressBar(hpPercent);
	setCondition(hpCurrent, nonlethal);
}

function setProgressBar(hpPercent) {
	var progressClasses = "progress-bar progress-bar-success";
	if (hpPercent < 25) {
		progressClasses = "progress-bar progress-bar-danger";
	} else if (hpPercent < 50) {
		progressClasses = "progress-bar progress-bar-warning";
	}

	var progressElement = $('#hpProgress');
	progressElement.css('width', hpPercent + "%");
	progressElement.text(hpPercent + "%");
	progressElement.attr('class', progressClasses);
}

function setCondition(hpCurrent, nonlethal) {
	var condition = "Alive";
	var conditionClasses = "label label-success";

	if (hpCurrent > 0) {
		if (hpCurrent == nonlethal) {
			condition = "Staggered";
			conditionClasses = "label label-warning";
		} else if (hpCurrent < nonlethal) {
			condition = "Unconscious";
			conditionClasses = "label label-warning";
		}
	} else if (hpCurrent == 0) {
		condition = "Disabled";
		conditionClasses = "label label-warning";
	} else if (hpCurrent <= -10) {
		condition = "Dead";
		conditionClasses = "label label-danger";
	} else if (hpCurrent < 0) {
		condition = "Dying";
		conditionClasses = "label label-danger";
	}

	var element = $('#condition');
	element.text(condition);
	element.attr('class', conditionClasses);
}

function recalculateOtherStatistics() {
	var conMod = parseInt($('#conMod').val()) || 0;
	var dexMod = parseInt($('#dexMod').val()) || 0;
	var wisMod = parseInt($('#wisMod').val()) || 0;
	
	var acFromArmor = 0;
	var ac = 10 + dexMod + acFromArmor;
	var touchAc = 10 + dexMod;
	var flatFootedAc = 10 + acFromArmor;

	$('#acTotal').val(ac);
	$('#touchAcTotal').val(touchAc);
	$('#flatFootedAcTotal').val(flatFootedAc);

	var initiativeTemp = parseInt($('#initiativeTemp').val()) || 0;
	$('#initiativeTotal').val(dexMod + initiativeTemp);

	var fortTemp = parseInt($('#fortTemp').val()) || 0;
	$('#fortSave').val(conMod + fortTemp);
	
	var refTemp = parseInt($('#refTemp').val()) || 0;
	$('#refSave').val(dexMod + refTemp);
	
	var willTemp = parseInt($('#willTemp').val()) || 0;
	$('#willSave').val(wisMod + willTemp);
}

function recalculateAttacks() {

}

function recalculateXp() {

}