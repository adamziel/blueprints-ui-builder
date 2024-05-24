import React, { useState } from 'react';
import { TextField, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Avatar, Box, Typography } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const StepList = () => {
  const [steps, setSteps] = useState([]);
  const [stepName, setStepName] = useState('');
  const [stepShortForm, setStepShortForm] = useState('');

  const handleAddStep = () => {
    if (stepName && stepShortForm) {
      setSteps([...steps, { name: stepName, shortForm: stepShortForm }] as any);
      setStepName('');
      setStepShortForm('');
    }
  };

  const handleDeleteStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>Add Steps</Typography>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        mb={2}
      >
        <TextField
          label="Step Name"
          variant="outlined"
          value={stepName}
          onChange={(e) => setStepName(e.target.value)}
          sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
          fullWidth
        />
        <TextField
          label="Short Form"
          variant="outlined"
          value={stepShortForm}
          onChange={(e) => setStepShortForm(e.target.value)}
          sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddStep}
          startIcon={<Add />}
        >
          Add Step
        </Button>
      </Box>
      <List>
        {steps.map((step: any, index) => (
          <ListItem key={index} divider>
            <ListItemAvatar>
              <Avatar>
                {step.name.charAt(0).toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={step.name}
              secondary={step.shortForm}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" color="secondary" onClick={() => handleDeleteStep(index)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default StepList;
