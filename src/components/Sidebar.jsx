import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { categories } from "../utils/constants";

function Sidebar({ selectedCategory, setSelectedCategory }) {
  const theme = useTheme();
  const isMediumScreenOrHigher = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Stack
      direction={isMediumScreenOrHigher ? "column" : "row"}
      sx={{
        overflowY: "auto",
        height: isMediumScreenOrHigher ? "95%" : "auto",
      }}
    >
      {categories.map((category) => (
        <button
          className="category-btn"
          onClick={() => {
            setSelectedCategory(category.name);
          }}
          key={category.name}
          style={{
            background: category.name === selectedCategory && "#FC1505",
            color: "white",
          }}
        >
          <span
            style={{
              color: category.name === selectedCategory ? "white" : "red",
              marginRight: "15px",
            }}
          >
            {category.icon}
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? "1" : "0.5",
            }}
          >
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
}

export default Sidebar;
