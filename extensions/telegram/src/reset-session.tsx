import { ActionPanel, Action, Icon, List, showToast, Toast, popToRoot, confirmAlert, Alert } from "@raycast/api";
import { resetSession } from "./services/telegram-client";

export default function ResetSession() {
  const handleReset = async () => {
    const confirmed = await confirmAlert({
      title: "Reset Telegram Session",
      message: "This will clear all stored authentication data. You will need to re-authenticate.",
      icon: Icon.Trash,
      primaryAction: {
        title: "Reset Session",
        style: Alert.ActionStyle.Destructive,
      },
    });

    if (!confirmed) return;

    try {
      await resetSession();
      await showToast({
        style: Toast.Style.Success,
        title: "Session Reset",
        message: "Your Telegram session has been cleared. Run the authentication command to log in again.",
      });
      await popToRoot();
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Reset Failed",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };

  return (
    <List isLoading={false}>
      <List.Item
        icon={Icon.Trash}
        title="Reset Telegram Session"
        subtitle="Clear stored authentication data and start fresh"
        actions={
          <ActionPanel>
            <Action icon={Icon.Trash} title="Reset Session" onAction={handleReset} />
          </ActionPanel>
        }
      />
    </List>
  );
}
