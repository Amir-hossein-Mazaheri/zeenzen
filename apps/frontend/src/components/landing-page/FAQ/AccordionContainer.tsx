import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface AccordionItem {
  id: string | number;
  question: string;
  answer: string;
}

interface AccordionContainerProps {
  items: AccordionItem[];
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary {...props} />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "#FFFFFF",
  padding: theme.spacing(1.5),
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(2),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: "1rem 1.5rem",
}));

const AccordionContainer: React.FC<AccordionContainerProps> = ({ items }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="mt-10 rounded-xl overflow-hidden shadow-spread-shadow">
      {items.map(({ id, question, answer }) => (
        <Accordion
          key={id}
          expanded={expanded === `panel${id}`}
          onChange={handleChange(`panel${id}`)}
        >
          <AccordionSummary
            sx={{ position: "relative" }}
            aria-controls={`panel${id}bh-content`}
            id={`panel${id}bh-header`}
          >
            <ExpandMoreIcon
              sx={{ position: "absolute", left: 0, marginLeft: "1rem" }}
            />
            <Typography
              sx={{
                width: "33%",
                flexShrink: 0,
                fontSize: "1.1rem",
              }}
            >
              {question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ lineHeight: 2.3 }}>{answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default AccordionContainer;
