import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import type { Section } from "../data/sections";
import { SectionContent } from "./section-content";

type SectionDialogProps = {
  open: boolean;
  section: Section | null | undefined;
  onClose: () => void;
};

export const SectionDialog = ({
  open,
  section,
  onClose,
}: SectionDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            bgcolor: "background.paper",
            boxShadow: 2,
            backdropFilter: "blur(18px)",
          },
        },
        backdrop: {
          sx: {
            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(2, 6, 23, 0.68)"
                : "rgba(247, 251, 255, 0.52)",
            backdropFilter: "blur(8px)",
          },
        },
      }}
    >
      <DialogTitle sx={{ pb: 1.5, pr: 7 }}>
        <Stack spacing={0.8}>
          <Typography
            variant="overline"
            color="primary.main"
            sx={{ fontWeight: 900, letterSpacing: "0.12em" }}
          >
            Checkpoint reached
          </Typography>
          <Typography
            id="section-dialog-title"
            variant="h2"
            sx={{ fontSize: { xs: 36, sm: 48 } }}
          >
            {section?.title}
          </Typography>
        </Stack>
        <IconButton
          aria-label="Close dialog"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 14,
            right: 14,
            color: "text.primary",
            bgcolor: "rgba(255, 255, 255, 0.08)",
            "&:hover": { bgcolor: "rgba(56, 247, 199, 0.16)" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          borderColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(148, 163, 184, 0.16)"
              : "rgba(16, 32, 50, 0.12)",
          overflowY: section?.id === "experience" ? "hidden" : "auto",
          pt: 2.5,
        }}
      >
        <SectionContent section={section} />
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2.5 }}>
        <Button variant="contained" color="primary" onClick={onClose}>
          Continue exploring
        </Button>
      </DialogActions>
    </Dialog>
  );
};
