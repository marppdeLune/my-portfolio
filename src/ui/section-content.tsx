import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { Section } from "../data/sections";

type SectionContentProps = {
  section: Section | null | undefined;
};

export const SectionContent = ({ section }: SectionContentProps) => {
  if (!section) return null;

  return (
    <Stack spacing={2.5}>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ lineHeight: 1.75 }}
      >
        {section.description}
      </Typography>
      {section.experiencePeriods?.length ? (
        <Stack spacing={1.2}>
          {section.experiencePeriods.map((experience, index) => (
            <Accordion
              key={`${experience.role}-${experience.period}`}
              defaultExpanded={index === 0}
              disableGutters
              sx={{
                color: "text.primary",
                bgcolor: "transparent",
                border: "1px solid",
                borderColor: (theme) => alpha(theme.palette.text.primary, 0.22),
                boxShadow: "none",
                overflow: "hidden",
                "&:before": { display: "none" },
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.text.primary, 0.04),
                },
                "&.Mui-expanded": {
                  bgcolor: (theme) => alpha(theme.palette.text.primary, 0.06),
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "text.primary" }} />}
                sx={{
                  alignItems: "center",
                  gap: 1,
                  minHeight: 0,
                  px: 1.6,
                  py: 0.4,
                  "& .MuiAccordionSummary-content": {
                    my: 1,
                  },
                  "& .MuiAccordionSummary-expandIconWrapper": {
                    mt: 0.2,
                  },
                }}
              >
                <Stack sx={{ minWidth: 0, width: "100%" }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 0.4, sm: 1 }}
                    sx={{
                      justifyContent: "space-between",
                      minWidth: 0,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                      {experience.role} - {experience.company}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      flexShrink: 0,
                      fontStyle: "italic",
                      fontWeight: 700,
                    }}
                  >
                    {experience.period}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {experience.location}
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  maxHeight: { xs: "34vh", sm: 260 },
                  overflowY: "auto",
                  px: 1.6,
                  pt: 0,
                  pb: 1.6,
                }}
              >
                <Stack component="ul" spacing={1} sx={{ m: 0, pl: 2.4 }}>
                  {experience.bullets.map((bullet) => (
                    <Typography
                      key={bullet}
                      component="li"
                      variant="body2"
                      color="text.primary"
                      sx={{ lineHeight: 1.65 }}
                    >
                      {bullet}
                    </Typography>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      ) : null}
      {section.items?.length > 0 && (
        <Stack spacing={1.1}>
          {section.items.map((item) => (
            <Box
              key={item}
              sx={{
                borderLeft: 4,
                borderColor: "primary.main",
                borderRadius: 1,
                bgcolor: "rgba(56, 247, 199, 0.08)",
                px: 1.6,
                py: 1.15,
              }}
            >
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ fontWeight: 800 }}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
};
