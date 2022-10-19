import { ShootSystemParticle } from "./shoot_system";

import { AirParticle } from "..";

import {
    Environment,
    NUTRIENT_ENERGY_RATIO,
    WATER_ENERGY_RATIO,
} from "../../environment";

import { PlantFamilyParticle } from "./plant";

export class BarkParticle extends ShootSystemParticle {
    constructor(x, y, plant_dna=null) {
        /**
         * @param {Number}  x           (Integer) x-coordinate of particle to be constructed
         * @param {Number}  y           (Integer) y-coordinate of particle to be constructed
         * @param {DNANode} plant_dna   The DNA-node object for this plant particle. Represents a node in a tree graph.
         */
        super(x, y, plant_dna);
        this.activation_level = 0

        this.is_active = true
        this.__child_directions = null
    }

    update(environment) {        
        this.health_update(environment)
        this.absorb_nutrients(environment)
        this.absorb_water(environment)

        if (this.dead || !this.is_active)
            return;
        
        this.generate_energy()

        if (this.__current_length < this.__thickness && this.energy >= this.activation_level)
            this.grow(environment)
    }

    grow(environment) {
        /**
         * Handles growing of bark particles from one another.
         * Will try to grow into 3 neighbouring cells which are closest to the current growth_angle.
         * Will become inactive at any point where all 3 cells that the bark particle is checking become BarkParticles
         * @param {Environment} environment Current application game environment
         */
        if (this.__child_directions == null) {
            let [base_x, base_y] = this.convert_angle_to_offset(this.growth_angle)
            this.__child_directions = [[base_x, base_y]]
            this.__child_directions.push(this.get_rotated_offset(base_x, base_y, -1))
            this.__child_directions.push(this.get_rotated_offset(base_x, base_y, 1))
        }

        // Condition to "turn off" bark
        if (this.__child_directions.length == 0) {
            this.is_active = false
            return
        }

        let [offset_x, offset_y] = this.__child_directions.shift()
        let target_particle = environment.get(this.x+offset_x, this.y+offset_y)

        if (target_particle instanceof AirParticle) {
            let new_bark_particle = new BarkParticle(this.x+offset_x, this.y+offset_y, this.dna)
            new_bark_particle.__current_length = this.__current_length + 1
            new_bark_particle.__thickness = this.__thickness
            new_bark_particle.growth_angle = this.growth_angle

            if (PlantFamilyParticle.IS_NET_ZERO) {
                new_bark_particle.nutrient_level += this.activation_level * NUTRIENT_ENERGY_RATIO
                new_bark_particle.water_level += this.activation_level * WATER_ENERGY_RATIO
            }

            environment.set(new_bark_particle)
            this.energy -= this.activation_level
        }

        if (!(target_particle instanceof BarkParticle))
            this.__child_directions.push([offset_x, offset_y])
    }
}