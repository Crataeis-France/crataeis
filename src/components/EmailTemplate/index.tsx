type EmailTemplateProps = {
  name: string;
  email: string;
  service: string;
  message: string;
};

export function EmailTemplate({
  name,
  email,
  service,
  message,
}: EmailTemplateProps) {
  return (
    <div
      style={{
        backgroundColor: "#f3f4f6",
        padding: "24px",
        fontFamily: "Inter, Arial, sans-serif",
        color: "#0f172a",
      }}
    >
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundColor: "#0b1326",
            color: "#dae2fd",
            padding: "20px 24px",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "20px", lineHeight: "28px" }}>
            New Contact Request
          </h1>
          <p style={{ margin: "6px 0 0 0", color: "#aeb9d0", fontSize: "14px" }}>
            Crataeis website contact form
          </p>
        </div>

        <div style={{ padding: "24px" }}>
          <p style={{ margin: "0 0 16px 0", fontSize: "14px" }}>
            You received a new message from the contact form.
          </p>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            <tbody>
              <tr>
                <td style={{ padding: "8px 0", color: "#64748b", width: "120px" }}>
                  Name
                </td>
                <td style={{ padding: "8px 0", fontWeight: 600 }}>{name}</td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0", color: "#64748b" }}>Email</td>
                <td style={{ padding: "8px 0", fontWeight: 600 }}>{email}</td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0", color: "#64748b" }}>Service</td>
                <td style={{ padding: "8px 0", fontWeight: 600 }}>{service}</td>
              </tr>
            </tbody>
          </table>

          <div
            style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "14px",
            }}
          >
            <p style={{ margin: "0 0 8px 0", color: "#64748b", fontSize: "13px" }}>
              Message
            </p>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
