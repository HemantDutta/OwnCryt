type EventName =
  | "product_viewed"
  | "product_interest_clicked"
  | "interest_form_submitted"
  | "newsletter_signup_completed"
  | "design_submission_started"
  | "design_submission_completed"
  | "search_used"
  | "design_saved";

type Props = Record<string, string | number | boolean | undefined>;

export function track(event: EventName, props: Props = {}): void {
  const payload = {
    event,
    props,
    at: new Date().toISOString(),
  };

  if (import.meta.env.DEV) {
    console.debug("[analytics]", payload);
  }

  window.dispatchEvent(new CustomEvent("owncryt:analytics", { detail: payload }));
}
