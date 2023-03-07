import { useSpring, animated } from "@react-spring/web";
import { useEffect } from "react";

function AnimatedNumber({
  value,
  from: startingValue = 0,
}: {
  value: number;
  from?: number;
}) {
  const [spring, api] = useSpring(() => ({
    from: {
      value: startingValue,
    },
  }));

  useEffect(() => {
    if (value === 0) return;
    api.start({ value });
  }, [value, spring.value]);

  return <animated.span>{spring.value.to((n) => Math.floor(n))}</animated.span>;
}

export default AnimatedNumber;
