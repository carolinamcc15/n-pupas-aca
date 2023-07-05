package com.npupas.api.models.entities;

import com.npupas.api.enums.ActionIdentifier;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class AllowedAction {
    @Id
    @Column(name = "id")
    @SequenceGenerator(name = "action_id_gen", sequenceName = "action_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "action_id_gen")
    private Long ID;

    @Column
    private String action;

    @Column
    private String description;

    @Column(unique = true)
    private ActionIdentifier identifier;

    @ManyToMany(mappedBy = "actions")
    private Set<Role> roles;
}
