export const formatZodIssues = (issues: any[]) => {
  return issues.map((issue) => {
    // Join the path (e.g., ["user", "email"] becomes "user.email")
    const field = issue.path?.length ? issue.path.join(".") : "field";

    switch (issue.code) {
      case "invalid_type":
        if (issue.received === "undefined") {
          return { field, message: `${field} is required` };
        }
        return { field, message: `${field} must be a ${issue.expected}` };

      case "too_small":
        const typeLabel = issue.type === "string" ? "characters" : "items";
        return { field, message: `${field} must be at least ${issue.minimum} ${typeLabel}` };

      case "invalid_string":
        if (issue.validation === "email") {
          return { field, message: `Please provide a valid email address` };
        }
        return { field, message: issue.message };

      default:
        // Fallback for codes like 'custom' or 'invalid_enum_value'
        return { field, message: issue.message };
    }
  });
};