import { gravatarUrl } from "../utils/gravatar";

export default function Avatar({ email, size = 32 }: { email: string; size?: number }) {
  return (
    <img
      src={gravatarUrl(email, size)}
      width={size}
      height={size}
      alt="avatar"
      style={{ borderRadius: "50%" }}
    />
  );
}
