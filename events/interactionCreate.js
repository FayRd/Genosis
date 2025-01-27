const { Events, Collection } = require('discord.js');
const path = require('node:path');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		// Button interactions
		switch (interaction.customId) {
			case 'Ping!':
				// Re-run the ping command
				const pingCommand = interaction.client.commands.get('ping');
				if (pingCommand) {
					pingCommand.execute(interaction);
				} else {
					pingCommand.error(`No command matching ${interaction.commandName} was found.`);
				}
				break;
			case 'selectDonation':
				if (interaction.values[0] === 'S$3.00') {
					interaction.reply({ content: 'Thank you for your donation!', files: [path.join(__dirname, '../static/images/paynow3.png')], ephemeral: true });
				} else if (interaction.values[0] === 'S$5.00') {
					interaction.reply({ content: 'Thank you for your donation!', files: [path.join(__dirname, '../static/images/paynow5.png')], ephemeral: true });
				}
				break;
			default:
				// Do nothing
				break;
		}

		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		const { cooldowns } = interaction.client;

		if (!cooldowns.has(command.data.name)) {
			cooldowns.set(command.data.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.data.name);
		const defaultCooldownDuration = 3;
		const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;


		if (timestamps.has(interaction.user.id)) {
			const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

			if (now < expirationTime) {
				const expiredTimestamp = Math.round(expirationTime / 1000);
				return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
			}
		}

		timestamps.set(interaction.user.id, now);
		setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'Um.. sorry I have problems executing that command for you! >^<', ephemeral: true });
			} else {
				await interaction.reply({ content: 'Um.. sorry I have problems executing that command for you! >^<', ephemeral: true });
			}
		}
	},
};