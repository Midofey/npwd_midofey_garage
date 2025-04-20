import React from 'react';
import { GarageItem } from '../types/garage';
import {
  Typography,
  Button,
  Box,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import BuildIcon from '@mui/icons-material/Build';
import { ServerPromiseResp } from '../types/common';
import fetchNui from '../utils/fetchNui';

const VehicleDetails = ({ veh, refreshVehicles }: { veh: GarageItem; refreshVehicles: () => void; }) => {
  const handleTrackVehicle = (plate: string) => {
    fetchNui<ServerPromiseResp>('npwd:midofey-garage:requestWaypoint', { plate }).then(
      (res) => {
        refreshVehicles();
      }
    );
  };

  const handleValetVehicle = (vehicle: GarageItem, owner: string, event: any) => {
    event.target.disabled = true;
    fetchNui<ServerPromiseResp>('npwd:midofey-garage:valetVehicle', { vehicle, owner }).then(
      (res) => {
        refreshVehicles();
      }
    );
    
  };

  if (!veh || typeof veh !== 'object') {
    return <div>Invalid vehicle data</div>;
  }
  
 // Safely handle data
const location = typeof veh?.garage === 'string' ? veh.garage : 'Unknown';
const engine = typeof veh?.engine === 'number' ? `${Math.ceil(veh.engine / 10)}%` : 'N/A';
const fuel = typeof veh?.fuel === 'number' ? `${Math.ceil(veh.fuel)}%` : 'N/A';
const body = typeof veh?.body === 'number' ? `${Math.ceil(veh.body / 10)}%` : 'N/A';

return (
  <Box sx={{color: '#fff', p: 2 }}>
    {/* Garage Location */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
      <LocationOnIcon fontSize="medium" />
      <Typography fontSize="1rem">{location}</Typography>
    </Box>

    {/* Divider line */}
    <Box sx={{ height: '1px', backgroundColor: '#fff', mb: 1 }} />

    {/* Stats */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
      <BuildIcon fontSize="medium" />
      <Typography fontSize="1rem">{engine}</Typography>
    </Box>

    {/* Divider line */}
    <Box sx={{ height: '1px', backgroundColor: '#fff', mb: 1 }} />

    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
      <LocalGasStationIcon fontSize="medium" />
      <Typography fontSize="1rem">{fuel}</Typography>
    </Box>

    {/* Divider line */}
    <Box sx={{ height: '1px', backgroundColor: '#fff', mb: 1 }} />

    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
      <DirectionsCarIcon fontSize="medium" />
      <Typography fontSize="1rem">{body}</Typography>
    </Box>

    {/* Divider line */}
    <Box sx={{ height: '1px', backgroundColor: '#fff', mb: 1 }} />

    {/* Buttons */}
    <Box display="flex" gap={1} mt={1}>
      <Button
        fullWidth
        variant="contained"
        disabled={veh?.state !== 'out'}
        onClick={() => handleTrackVehicle(veh?.plate)}
        sx={{
          color: '#fff',
          backgroundColor: '#212121',
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: '0.75rem',
        }}
      >
        GPS
      </Button>
      <Button
        fullWidth
        variant="contained"
        disabled={veh?.state === 'out'}
        onClick={(e) => handleValetVehicle(veh, veh?.owner, e)}
        sx={{
          color: '#fff',
          backgroundColor: '#212121',
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: '0.75rem',
        }}
      >
        VALET
      </Button>
    </Box>
  </Box>
);
};

export default VehicleDetails;
