local ESX = exports["es_extended"]:getSharedObject()

local function findVehFromPlateAndLocate(plate)
	local gameVehicles = ESX.Game.GetVehicles()
	for i = 1, #gameVehicles do
		local vehicle = gameVehicles[i]
		if DoesEntityExist(vehicle) then
			if ESX.Game.GetVehicleProperties(vehicle).plate == plate then
				local vehCoords = GetEntityCoords(vehicle)
				SetNewWaypoint(vehCoords.x, vehCoords.y)
				return true
			end
		end
	end
end

local function findStreetNameFromVehicle(plate)
	local gameVehicles = ESX.Game.GetVehicles()
	for i = 1, #gameVehicles do
		local vehicle = gameVehicles[i]
		if DoesEntityExist(vehicle) then
			if ESX.Game.GetVehicleProperties(vehicle).plate == plate then
				local vehCoords = GetEntityCoords(vehicle)
				return GetStreetNameFromHashKey(GetStreetNameAtCoord(vehCoords.x, vehCoords.y, vehCoords.z))
			end
		end
	end
end

RegisterNUICallback("npwd:midofey-garage:getVehicles", function(_, cb)
	TriggerServerEvent("npwd:midofey-garage:getVehicles")
	RegisterNetEvent("npwd:midofey-garage:sendVehicles", function(vehicles)
		for _, v in pairs(vehicles) do
			local type = GetVehicleClassFromName(v.hash)
			v.model = GetDisplayNameFromVehicleModel(v.hash)
			v.brand = string.lower(GetMakeNameFromVehicleModel(v.hash))
			v.vehicle = string.lower(GetDisplayNameFromVehicleModel(v.hash))
			v.brand = v.brand:gsub("^%l", string.upper)
			v.vehicle = v.vehicle:gsub("^%l", string.upper)

			if v.state == 'out' then
				v.garage = findStreetNameFromVehicle(v.plate)
			end
			if type == 15 or type == 16 then
				v.type = "aircraft"
			elseif type == 14 then
				v.type = "boat"
			elseif type == 13 or type == 8 then
				v.type = "bike"
			else
				v.type = "car"
			end
		end

		cb({ status = "ok", data = vehicles })
	end)
end)

RegisterNUICallback("npwd:midofey-garage:requestWaypoint", function(data, cb)
	local plate = data.plate
	if findVehFromPlateAndLocate(plate) then
		ESX.ShowNotification("Your vehicle has been marked", "success")
	else
		ESX.ShowNotification("This vehicle cannot be located", "error")
	end
	cb({})
end)

RegisterNuiCallback("npwd:midofey-garage:valetVehicle", function(data, cb)
	local coords = GetEntityCoords(PlayerPedId())
	local ret, coordsTemp, heading = GetClosestVehicleNodeWithHeading(coords.x, coords.y, coords.z, 1, 3.0, 0)
	local retval, coordsSide = GetPointOnRoadSide(coordsTemp.x, coordsTemp.y, coordsTemp.z)
	if data.vehicle.state ~= 'out' then
		lib.callback("midofey_garage:valetVehicle", false, function(vehicleId)
			cb({})
		end, data.vehicle.plate, data.vehicle, coordsSide, heading)
	else
		ESX.Game.ShowNotification("Error getting vehicle!", "error")
		cb({})
	end
end)
