import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { config } from "../config";

export const data = new SlashCommandBuilder()
  .setName('pr')
  .setDescription("View all Pull Requests");

export async function execute(interaction: CommandInteraction) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${config.GITHUB_USERNAME}/${config.GITHUB_REPO}/pulls`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${config.GITHUB_ACCESS_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (!response.ok) {
      await interaction.reply(
        `Failed to fetch pull requests, ${response.status} ${response.statusText}`
      );
      return;
    }

    const pulls = await response.json();
    if (!Array.isArray(pulls) || pulls.length === 0) {
      await interaction.reply("No pull requests found.");
      return;
    }

    const pullRequests = pulls
      .slice(0, 5) // Get the latest 5 pull requests
      .map(
        (pr: any) =>
          `- ${pr.title} (by ${pr.user.login}) - ${pr.html_url}`
      )
      .join("\n");

    await interaction.reply(
      `**Recent Pull Requests for ${config.GITHUB_USERNAME}/${config.GITHUB_REPO}:**\n${pullRequests}`
    );
  } catch (error) {
    console.error(error);
    await interaction.reply("An error occurred while fetching pull requests.");
  }
}